from django.db import models


# Create your models here.
class PowerConsumption(models.Model):
    name = models.CharField(max_length=20, null=True)
    watt = models.IntegerField(null=True)
    power_flag = models.CharField(max_length=1, null=True)
    start_date = models.IntegerField(null=True)
    end_date = models.IntegerField(null=True)
    file_name = models.CharField(max_length=50, null=True)

class ObservationLocation(models.Model):
    code = models.IntegerField()
    location = models.CharField(max_length=6)
    department = models.CharField(max_length=20)

    create_at = models.DateTimeField(auto_now_add=True, null=True)
    update_at = models.DateTimeField(auto_now=True, null=True)


class Weather(models.Model):
    tm = models.CharField(max_length=20)  # 일시
    rnum = models.IntegerField()  # 목록 순서
    stnid = models.IntegerField()  # 종관기상관측 지점 번호
    stnnm = models.CharField(max_length=6)  # 종관기상관측 지점명
    ta = models.FloatField(max_length=6, null=True)  # 기온(°C)
    taqcflg = models.CharField(max_length=1, null=True)  # 기온 관측 정상여부
    rn = models.FloatField(max_length=6, null=True)  # 강수량(mm)
    rnqcflg = models.CharField(max_length=1, null=True)  # 강수량 관측 정상여부
    ws = models.FloatField(max_length=6, null=True)  # 풍속(m/s)
    wsqcflg = models.CharField(max_length=1, null=True)  # 풍속 관측 정상여부
    wd = models.IntegerField(null=True)  # 풍향(16방위)
    wdqcflg = models.CharField(max_length=1, null=True)  # 풍향 관측 정상여부
    hm = models.IntegerField(null=True)  # 습도(%)
    hmqcflg = models.CharField(max_length=1, null=True)  # 습도 관측 정상여부
    pv = models.FloatField(max_length=6, null=True)  # 증기압(hPa)
    td = models.FloatField(max_length=6, null=True)  # 이슬점온도(°C)
    pa = models.FloatField(max_length=6, null=True)  # 현지기압(hPa)
    paqcflg = models.CharField(max_length=1, null=True)  # 현지기압 관측 정상여부
    ps = models.FloatField(max_length=6, null=True)  # 해면기압(hPa)
    psqcflg = models.CharField(max_length=1, null=True)  # 해면기압 관측 정상여부
    ss = models.FloatField(max_length=6, null=True)  # 일조
    ssqcflg = models.CharField(max_length=1, null=True)  # 일조 관측 정상여부
    icsr = models.FloatField(max_length=6, null=True)  # 일사(MJ/m2)
    dsnw = models.FloatField(max_length=6, null=True)  # 적설(cm)
    hr3fhsc = models.FloatField(max_length=6, null=True)  # 3시간신적설(cm)
    dc10tca = models.IntegerField(null=True)  # 전운량(10분위)
    dc10lmcsca = models.IntegerField(null=True)  # 중하층운량(10분위)
    clfmabbrcd = models.CharField(max_length=10, null=True)  # 운형(운형약어)
    lcsch = models.IntegerField(null=True)  # 최저운고(100m )
    vs = models.IntegerField(null=True)  # 시정10m
    gndsttcd = models.IntegerField(null=True)  # 현상번호(국내식)
    dmstmtphno = models.FloatField(max_length=10, null=True)  # 지면온도(°C)
    ts = models.FloatField(max_length=6, null=True)  # 지면온도(°C)
    tsqcflg = models.CharField(max_length=1, null=True)  # 지면온도 관측 정상여부
    m005te = models.FloatField(max_length=6, null=True)  # 5cm 지중온도(°C)
    m01te = models.FloatField(max_length=6, null=True)  # 10cm 지중온도(°C)
    m02te = models.FloatField(max_length=6, null=True)  # 20cm 지중온도(°C)
    m03te = models.FloatField(max_length=6, null=True)  # 30cm 지중온도(°C)

    create_at = models.DateTimeField(auto_now_add=True, null=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
