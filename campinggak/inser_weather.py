import os
import psycopg2 as pg2
import requests
import time

DB_values = []
f = open(os.path.dirname(os.path.abspath(__file__)) + '/db.txt', 'r')
while True:
    line = f.readline()
    if not line:
        break
    DB_values.append(line.split(':')[1].strip())
f.close()

conn_info = pg2.connect(
    database=DB_values[0]
    , user=DB_values[1]
    , password=DB_values[2]
    , host=DB_values[3]
    , port=DB_values[4]
)

codes = []
try:
    with conn_info as conn:
        with conn.cursor() as cur:
            sql = "SELECT code FROM backend_observationlocation"
            cur.execute(sql)
            codes = cur.fetchall()
except Exception as e:
    print(e)

if codes:
    is_continue = False
    for code in codes:
        # if code[0] == 259:
        #     is_continue = True
        #
        # if not is_continue:
        #     continue

        print('코드', code[0])
        # 종관기상관측 API
        res = requests.get(
            'http://apis.data.go.kr/1360000/AsosHourlyInfoService/getWthrDataList?'
            'serviceKey=wz2BLhppArVT7F0pSypwxGVMXbOG%2BgUCycEhb%2Fi9CHFreNChOpTUcZKWX8KNUyd48z0zVuUsV%2FRr27GDngPG4Q%3D%3D'
            '&pageNo=1'
            '&numOfRows=50'
            '&dataType=JSON'
            '&dataCd=ASOS'
            '&dateCd=HR'
            '&startDt=20220215'
            '&startHh=00'
            '&endDt=20220215'
            '&endHh=23'
            '&stnIds=' + str(code[0])
        )
        data = res.json()
        res.close()
        data = data['response']['body']['items']['item']

        time.sleep(5)

        for json_row in data:

            row = []
            for i in json_row.items():
                if i[1].isdecimal():
                    new_index1 = int(i[1])
                elif '.' in i[1]:
                    new_index1 = float(i[1])
                else:
                    if not i[1]:
                        new_index1 = None
                    else:
                        new_index1 = i[1]
                row.append(new_index1)

            row = tuple(row)
            try:
                with conn_info as conn:
                    with conn.cursor() as cur:
                        sql = "INSERT INTO backend_weather (tm,rnum,stnId,stnNm,ta,taQcflg,rn,rnQcflg,ws,wsQcflg,wd,wdQcflg,hm,hmQcflg,pv,td,pa,paQcflg,ps,psQcflg,ss,ssQcflg,icsr,dsnw,hr3Fhsc,dc10Tca,dc10LmcsCa,clfmAbbrCd,lcsCh,vs,gndsttcd,dmstMtphNo,ts,tsQcflg,m005Te,m01Te,m02Te,m03Te) VALUES (" + ",".join(
                            ["%s"] * len(row)) + ")"
                        cur.execute(sql, row)
            except Exception as e:
                print(e)

conn.close()
print('done')
