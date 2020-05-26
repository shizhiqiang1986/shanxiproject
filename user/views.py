from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout,decorators
from django.contrib.auth.models import User

def loginview(request):
   username = request.POST.get('username','')
   userpassword = request.POST.get('userpassword','')
   if username=="":
      return render(request,'login.html')
   else:
      if User.objects.filter(username=username):
         user = authenticate(username=username, password=userpassword)
         if user:
            if user.is_active:
               login(request, user)
            return redirect('/main/',{'user':username})
         else:
            tips = '账号或密码错误'
      else:
         tips = '账号不存在请联系管理员'
      return render(request,'login.html',{'msg':tips})

def logoutview(request):
   logout(request)
   return redirect('/login/')
