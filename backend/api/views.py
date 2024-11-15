# api/views.py

from rest_framework import viewsets
from rest_framework import generics

from .models import User, Quiz, QuizProgress
from .serializers import UserSerializer, QuizSerializer, QuizProgressSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        password = request.data.get('password')
        username = request.data.get('username')
        email = request.data.get('email')

        user = User(username=username, email=email)
        user.set_password(password)  # Hash password
        user.save()
        return Response({'status': 'User  created'}, status=201)
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    @action(detail=False, methods=['get'])
    def get_quiz(self, request):
        quizzes = self.queryset.values()
        return Response(quizzes)
    
class QuizProgressView(generics.ListCreateAPIView):
    queryset = QuizProgress.objects.all()
    serializer_class = QuizProgressSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  # Hanya pengguna terautentikasi yang dapat mengakses


    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)