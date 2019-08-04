from rest_framework import generics
from .models import Post
from .serializers import PostSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

def homepage(request):
    return render(request, "index.html")