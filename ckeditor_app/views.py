from rest_framework import generics
from .models import Post
from .serializers import PostSerializer
from rest_framework import viewsets


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = []