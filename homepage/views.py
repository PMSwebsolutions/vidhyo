from django.shortcuts import render
from django.views.generic import TemplateView
from django.urls import reverse
from django.http import HttpResponse
from django.core.mail import send_mail
class home(TemplateView):
    template_name = "homepage/home.html"

    def post(self, request):
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        phone = request.POST.get('phone')
        message = request.POST.get('message')
        send_mail(
        subject,
        message,
        'pranav1503@gmail.com',
        [email],
        fail_silently=False,
        )
        print("{} {} {} {} {}".format(name,email,subject,phone,message))
        return HttpResponse('')
        
