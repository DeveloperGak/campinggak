import json
import pickle
from datetime import datetime, timedelta

import requests
from django.conf import settings
from django.core import serializers
from django.db.models import Q, Sum

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import PowerConsumption, ObservationLocation, Weather

query_time = (datetime.today() - timedelta(1)).strftime("%Y-%m-%d")
# query_time = "2022-02-14"

# Create your views here.
def set_powerflag(request):
    id = request.GET.get('id', None)
    power_flag = request.GET.get('power_flag', None)

    power = PowerConsumption.objects.get(id=id)
    power.power_flag=power_flag
    results = power.save()

    return HttpResponse(results)


def set_time(request):
    id = request.GET.get('id', None)
    target = request.GET.get('target', None)
    time = request.GET.get('time', None)
    print(id, target, time)
    power = PowerConsumption.objects.get(id=id)
    if target == 'start_date':
        power.start_date=time
    elif target == 'end_date':
        power.end_date = time

    results = power.save()

    return HttpResponse(results)


def get_location(request):
    get_all = ObservationLocation.objects.all()
    results = serializers.serialize('json', get_all)

    return HttpResponse(results)


def power_generation(request):
    import sklearn
    code = request.GET.get("code", None)
    get_weather = Weather.objects.filter(stnid=code, tm__contains=query_time).values()

    time_list = []
    predict_list = []
    for i in get_weather:
        time_list.append(i['tm'])
        if i['icsr'] is None:
            icsr = 0
        else:
            icsr = float(i['icsr']) * 277

        if i['ta'] is None:
            ta = 0
        else:
            ta = float(i['ta'])

        if i['ws'] is None:
            ws = 0
        else:
            ws = float(i['ws'])

        predict_list.append([icsr, ta, ws])

    filepath = settings.STATIC_ROOT.replace('\\', '/')
    results = []

    with open(filepath+'/model/power_generation_model_20220215.pkl', 'rb') as file:
        model = pickle.load(file)
        generate_add = 0
        for i in range(len(time_list)):
            predict_result = model.predict([predict_list[i]])
            generate_add = generate_add + round(predict_result[0], 2)
            results.append(
                {"time": time_list[i].split(' ')[1]
                    , "icsr": round(predict_list[i][0], 2)
                    , "ta": predict_list[i][1]
                    , "ws": predict_list[i][2]
                    , "generate": round(predict_result[0] * 1000, 2)
                    , "누적충전량": round(generate_add * 1000, 2)
                 }
            )
    results = json.dumps(results)

    return HttpResponse(results)


def get_equipment(request):
    get_query = PowerConsumption.objects.all().order_by('id')
    results = serializers.serialize('json', get_query)

    return HttpResponse(results)


def get_icsr_high(request):
    get_query = Weather.objects.filter(~Q(icsr=None), tm__contains=query_time).order_by('-icsr')[:3]
    results = serializers.serialize('json', get_query)

    return HttpResponse(results)


def get_rn_high(request):
    get_query = Weather.objects.filter(~Q(rn=None), tm__contains=query_time).order_by('-rn')[:3]
    results = serializers.serialize('json', get_query)
    return HttpResponse(results)


def get_power_high(request):
    get_query = PowerConsumption.objects.filter(power_flag="1")
    results = []
    for i in get_query:
        if i.start_date < i.end_date:
            taken = int(i.end_date) - int(i.start_date)
            results.append(
                {"name": i.name
                    , "watt": i.watt
                    , "taken": taken
                    , "used_power": taken * i.watt
                 }
            )
    results = json.dumps(results)

    return HttpResponse(results)

def get_power_consumption(request):
    get_query = PowerConsumption.objects.filter(power_flag="1")

    time_set = {}
    for i in range(0,24):
        if len(str(i)) == 1:
            time = '0'+str(i)+':00'
        else:
            time = str(i) + ':00'
        time_set[time] = 0

    for i in get_query:
        for j in range(i.start_date, i.end_date):
            if len(str(j)) == 1:
                time = '0' + str(j) + ':00'
            else:
                time = str(j) + ':00'
            time_set[time] = time_set[time] + i.watt

    results=[]
    spent_add = 0
    for i in time_set:
        spent_add = spent_add + time_set[i]
        results.append(
            {"time": i
                , "at_time": time_set[i]
                , "누적소비량": spent_add
             }
        )
    results = json.dumps(results)

    return HttpResponse(results)