<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use App\Repository\MessageRepository;
use App\Service\JsonHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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

    #[Route('/messages', name: 'message_list')]
    public function messageList(MessageRepository $messageRepository): JsonResponse
    {
        $user = $this->getUser();

        return $this->json([
            'success' => true,
            'messages' => $messageRepository->findAllUserMessages($user),
        ], 200, [], ['groups' => 'main']);
    }

    #[Route('/message/{toUser}', name: 'message_user', methods: 'POST')]
    public function messageUser(Request $request, User $toUser, EntityManagerInterface $entityManager, HubInterface $hub)
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
                'from' => [
                    'id' => $message->getFromUser()->getId(),
                    'username' => $message->getFromUser()->getUsername()
                ],
                'to' => [
                    'id' => $message->getToUser()->getId(),
                    'username' => $message->getToUser()->getUsername()
                ],
                'content' => $message->getContent(),
                'sent_at' => $message->getSentAt(),
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'from' => [
                'id' => $message->getFromUser()->getId(),
                'username' => $message->getFromUser()->getUsername()
            ],
            'to' => [
                'id' => $message->getToUser()->getId(),
                'username' => $message->getToUser()->getUsername()
            ],
            'content' => $message->getContent(),
            'sent_at' => $message->getSentAt(),
        ]);
    }
}