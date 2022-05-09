# Generated by Django 4.0.2 on 2022-02-14 07:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_weather_create_at_weather_update_at_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='weather',
            old_name='clfmAbbrCd',
            new_name='clfm_abbrCd',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='dc10LmcsCa',
            new_name='dc10_lmcsCa',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='dc10Tca',
            new_name='dc10_tca',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='dmstMtphNo',
            new_name='dmst_mtphNo',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='gndSttCd',
            new_name='gnd_sttCd',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='hmQcflg',
            new_name='hm_qcflg',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='hr3Fhsc',
            new_name='hr3_fhsc',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='m005Te',
            new_name='m005_te',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='m01Te',
            new_name='m01_te',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='m02Te',
            new_name='m02_te',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='m03Te',
            new_name='m03_te',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='paQcflg',
            new_name='pa_qcflg',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='psQcflg',
            new_name='ps_qcflg',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='rnQcflg',
            new_name='rn_qcflg',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='ssQcflg',
            new_name='ss_qcflg',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='stnId',
            new_name='stn_id',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='stnNm',
            new_name='stn_nm',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='taQcflg',
            new_name='ta_qcflg',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='tsQcflg',
            new_name='ts_qcflg',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='wdQcflg',
            new_name='wd_qcflg',
        ),
        migrations.RenameField(
            model_name='weather',
            old_name='wsQcflg',
            new_name='ws_qcflg',
        ),
    ]