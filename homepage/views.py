from django.shortcuts import render
from django.views.generic import TemplateView
from django.urls import reverse
from django.http import HttpResponse
from django.core.mail import send_mail
from subscriber.models import Subscriber
class home(TemplateView):
    template_name = "homepage/home.html"

    def post(self, request):
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            subject = request.POST.get('subject')
            phone = request.POST.get('phone')
            message = request.POST.get('message')
            email_message = "Name : "+ name + "\nEmail: "+email+"\nPhone: "+phone+"\nMessage: \n"+message
            send_mail(
            'customer contact',
            email_message,
            'vidhyo.io@gmail.com',
            ['vidhyo.io@gmail.com'],
            fail_silently=False,
            )
        except:
            emails = request.POST.get('email')
            Subscriber.objects.create(
            email = emails
            )
            print(email)
        return HttpResponse('')
