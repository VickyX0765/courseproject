
import numpy as np
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.utils.extmath import weighted_mode
from sklearn.base import BaseEstimator, ClassifierMixin
import math

#Similarity Measures
#In the case of categorical variables, Hamming distance is the best choice to measure similarity
from scipy.spatial import distance
def calc_dist(a, b):
  return distance.hamming(a, b)

from sklearn.utils.extmath import weighted_mode
from sklearn.base import BaseEstimator, ClassifierMixin
import math
class MyModel(BaseEstimator, ClassifierMixin):
  def __init__(self, target_names, top = 3, threhold = 0.5):
    self.X_train = None
    self.y_train = None
    self.target_names = target_names
    self.target_count = len(target_names)
    self.top = top
    self.threhold = threhold

  def fit(self, X_train, y_train):
    self.X_train = X_train.values
    self.y_train = y_train.values
    return self

  def predict(self, X_test):
    pred_prob = self.predict_proba(X_test)
    return np.argmax(pred_prob, axis=1)

  def pred_top(self, X_test):
    pred_prob = self.predict_proba(X_test)
    return np.argsort(pred_prob, axis=1)[:, -self.top:]

  def pred_top_in_order(self, X_test):
    pred_tops = self.pred_top(X_test)
    top_values = []
    for j in range(len(pred_tops)):
      top = []
      for i in range (self.top-1,-1,-1):
        top.append(self.target_names[pred_tops[j][i]])
      top_values.append(top)
    return top_values

  def pred_top_with_prob(self, X_test):
    pred_prob = self.predict_proba(X_test)
    pred_tops = np.argsort(pred_prob, axis=1)[:, -self.top:]
    pred_prob_top = np.sort(pred_prob, axis=1)[:, -self.top:]
    top_values = []
    for j in range(len(pred_tops)):
      top = []
      for i in range (self.top-1,-1,-1):
        top.append(tuple((self.target_names[pred_tops[j][i]],pred_prob_top[j][i])))
      top_values.append(top)
    return top_values

  def predict_proba(self, X_test):
    y_pred = []

    for test in X_test:
      y_pred.append(self.__predict_one(test))

    return y_pred

  def __predict_one(self, test):
    test_pred = [0] * self.target_count
    for i in range(len(self.y_train)):
      x = self.X_train[i]
      y = self.y_train[i]
      dist = calc_dist(x, test)
      if dist == 0:
        test_pred[int(y)] += 20
      elif dist <= self.threhold:
        test_pred[int(y)] += 1/dist
    return test_pred/sum(test_pred)

