<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\JsonHelper;
use Doctrine\ORM\EntityManagerInterface;
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

    #[Route('/message/{user}', name: 'message_user', methods: 'POST')]
    public function messageUser(Request $request, UserRepository $userRepository, User $user, EntityManagerInterface $entityManager, HubInterface $hub)
    {
        $json = $this->jsonHelper->getJson($request);

        if (!isset($json["from_user"])) {
            return $this->json([
                'success' => false,
                'message' => 'Sender user is not defined!'
            ]);
        }

        $from_user = $userRepository->findOneBy(['id' => $json["from_user"]]);

        if (!isset($json["message"])) {
            return $this->json([
                'success' => false,
                'message' => 'Message cannot be null!'
            ]);
        }

        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'user' => $user->getUsername(),
                'id' => $user->getId(),
                'message' => $json["message"],
                'from' => $from_user->getUsername(),
                'to' => $user->getUsername(),
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