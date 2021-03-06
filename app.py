from flask import Flask, jsonify, render_template, request, session, Markup
import pandas as pd # data wrangling
import numpy as np


import matplotlib.pyplot as plt
import base64
from io import BytesIO

from math import pi

app = Flask(__name__)

app.config['SECRET_KEY'] = 'pk'


@app.route('/informe')
def informe():

    beta=session["beta"]
    phi=session["phi"]
    alpha=session["alpha"]
    P=session["P"]

    fig = plt.figure()
    plt.bar([1,3], [4,1], align='center')

    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    model_plot = Markup('<img src="data:image/png;base64,{}">'.format(plot_url))




    #  devuelta navegador
    informe=render_template('notebook.html', phi=phi, alpha=alpha, beta=beta, P=P, model_plot = model_plot )
    return jsonify( informe=informe)





@app.route('/formulario')
def formulario():
    # datos del navegador
    beta = request.args.get('inclinacion', 0, type=int)
    alpha = request.args.get('orientacion', 0, type=int)
    phi = request.args.get('latitud', 0, type=float)




    # calculos


    if beta > 15:
        # P=   100*(1.2*10**(-4)*(beta-phi+10)**2+3.5*10**(-5)*alpha**2),2)
        P =  100*((1.2*10**(-4)*(beta-phi+10)**2)+(3.5*(10**(-5))*alpha**2))
        P=round(P,2)
    elif beta <= 15:
        P =  100*((1.2*10**(-4)*(beta-phi+10)**2))
        P=round(P,2)


    #  figura

    # 
    session["beta"]=beta
    session["alpha"]=alpha
    session["phi"]=phi
    session["P"]=P

    return jsonify( P=P)



@app.route('/infor')
def infor():
    return render_template('informe.html')



@app.route('/')
def index():
    return render_template('index.html')
    # return render_template('app.html')

if __name__ == '__main__':
    app.run('0.0.0.0', 5500,debug=True)
    