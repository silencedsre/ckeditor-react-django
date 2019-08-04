from django.urls import path, include
from .views import BlogViewSet
from rest_framework.routers import DefaultRouter
from . import views;

router = DefaultRouter()
router.register(r'post', BlogViewSet, basename='blog')
urlpatterns = [path('', views.homepage, name="homepage_view"),]+router.urls