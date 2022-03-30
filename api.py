from flask import Flask, request, render_template,jsonify
import pandas as pd
from model import MyModel
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pred', methods=['POST'])
def my_model():
    skill_list = ['python', 'r', 'sql', 'c', 'c++', 'java', 'javascript', 'bash', 'matlab']
    jobs  = ['Machine Learning Engineer / Research Scientist', 'DBA/Database Engineer / Data Engineer / Software Engineer','Program/Project Manager / Product Manager / Statistician / Developer Relations/Advocacy','Data Analyst', 'Data Scientist', 'Business Analyst']
    raw = request.form['skills']
    if raw == "":
        result = {'0': "Please select your skills. <br>", '1': " E.g. Python, R, SQL, C, C++, Java, Javascript, Bash, MATLAB"}
        return jsonify(result=result)
    to_pred = []
    for skill in skill_list:
        if skill in raw:
            to_pred.append(1)
        else:
            to_pred.append(0)
    if sum(to_pred) == 0:
        result = {'0': "Did you miss to add some basic skills? <br>", '1': " E.g. Python, R, SQL, C, C++, Java, Javascript, Bash, MATLAB"}
        return jsonify(result=result)
    clean_df = pd.read_csv ('clean_data.csv')
    X = clean_df.drop(['Q5'], axis=1)
    y = clean_df['Q5']
    my_model = MyModel(target_names = jobs)
    my_model.fit(X,y)
    choices = my_model.pred_top_in_order([to_pred])
    result = {'1': "<li>" + choices[0][0] + "</li>", '2':"<li>" + choices[0][1] + "</li>", '3':"<li>" + choices[0][2] + "</li>"}
    return jsonify(result=result)
if __name__ == '__main__':
    app.run(debug=True)