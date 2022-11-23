<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\JsonHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class PingController extends AbstractController
{
    private JsonHelper $jsonHelper;

    public function __construct(JsonHelper $jsonHelper)
    {
        $this->jsonHelper = $jsonHelper;
    }

    #[Route('/ping/{user}', name: 'ping_user', methods: 'POST')]
    public function pingUser(Request $request, User $user, HubInterface $hub)
    {
        $json = $this->jsonHelper->getJson($request);

        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'user' => $user->getUsername(),
                'id' => $user->getId(),
                'message' => $json["message"]
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Ping sent'
        ]);
    }
}