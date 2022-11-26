<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\JsonHelper;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    private JsonHelper $jsonHelper;

    public function __construct(JsonHelper $jsonHelper)
    {
        $this->jsonHelper = $jsonHelper;
    }

    #[Route('/message/{toUser}', name: 'message_user', methods: 'POST')]
    public function messageUser(Request $request, UserRepository $userRepository, User $toUser, EntityManagerInterface $entityManager, HubInterface $hub)
    {
        $fromUser = $this->getUser();

        if (!$fromUser) {
            return $this->json([
                'success' => false,
                'message' => 'Sender user is undefined!'
            ]);
        }

        $json = $this->jsonHelper->getJson($request);

        if (!isset($json["message"])) {
            return $this->json([
                'success' => false,
                'message' => 'Message cannot be null!'
            ]);
        }

        $message = new Message();
        $message->setFromUser($fromUser)
            ->setToUser($toUser)
            ->setContent($json["message"])
            ->setSentAt(new \DateTime());

        $entityManager->persist($message);
        $entityManager->flush();

        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/user/{$toUser->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'from' => $fromUser->getId(),
                'to' => $toUser->getId(),
                'message' => $json["message"],
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'success' => true,
            'message' => 'Message sent!'
        ]);
    }
}