from django.urls import path
from .views import BillingListCreate, BillingDetail

urlpatterns = [
    path('billing/', BillingListCreate.as_view(), name='billing_list_create'),
    path('billing/<int:pk>/', BillingDetail.as_view(), name='billing_detail'),
]
