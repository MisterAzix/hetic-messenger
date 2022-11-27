<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\JsonHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    private UserPasswordHasherInterface $passwordHasher;
    private JsonHelper $jsonHelper;

    public function __construct(UserPasswordHasherInterface $passwordHasher, JsonHelper $jsonHelper)
    {
        $this->passwordHasher = $passwordHasher;
        $this->jsonHelper = $jsonHelper;
    }

    #[Route('/user-list', name: 'user_list')]
    public function userList(UserRepository $userRepository): JsonResponse
    {
        return $this->json([
            'users' => $userRepository->findAll()
        ], 200, [], ['groups' => 'main']);
    }

    #[Route("/user/new", name: "user_creation", methods: ["POST"])]
    public function userCreation(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $json = $this->jsonHelper->getJson($request);

        if ($json["password"] !== $json["confirm_password"]) {
            return $this->json([
                'message' => 'Password and confirm password must be same!'
            ]);
        }

        $newUser = new User();
        $newUser->setUsername($json["username"]);
        $newUser->setPassword($this->passwordHasher->hashPassword($newUser, $json["password"]));

        $entityManager->persist($newUser);
        $entityManager->flush();

        return $this->json([
            'user' => $newUser
        ], 200, [], ['groups' => 'main']);
    }
}