from django.urls import path

from . import views

urlpatterns = [
    # path('', views.index, name='index')
    path('set_powerflag', views.set_powerflag, name='set_powerflag')
    , path('set_time', views.set_time, name='set_time')
    , path('power_generation', views.power_generation, name='power_generation')
    , path('get_location', views.get_location, name='get_location')
    , path('get_equipment', views.get_equipment, name='get_equipment')
    , path('get_icsr_high', views.get_icsr_high, name='get_icsr_high')
    , path('get_rn_high', views.get_rn_high, name='get_rn_high')
    , path('get_power_high', views.get_power_high, name='get_power_high')
    , path('get_power_consumption', views.get_power_consumption, name='get_power_consumption')

]
