import numpy
import math
import numpy as np
import pyspark

class myLogistic:
    def __init__(self, lr, epoch_n, feature_len):
        self.lr = lr
        self.epoch_n = epoch_n
        self.w = np.zeros((feature_len,)) + 1
        self.b = 1
        self.feature_len = feature_len

    def train(self, dataset):
        for i in range(self.epoch_n):
            features_e = dataset.sample(False, 0.5, None)
            dw, db = features_e.map(lambda x: self.train_one_epoch(x))
            self.w = self.w - sum(dw) / self.batch_n
            self.b = self.b - sum(db) / self.batch_n

    def train_one_epoch(self, data):
        feature = data.take(range(0,self.feature_len))
        label = data.item(self.feature_len)
        y_ = self.train_predict(feature)
        err = label - y_
        db = self.lr * err[:,None]
        dw = db * feature
        return np.sum(dw, axis=1), np.sum(db, axis= 1)

    def train_predict(self, feature):
        x = np.dot(feature, self.w) + self.b
        return 1 / (1 + np.e**(x))

    def predict(self, feature):
        return 1 if self.train_predict(feature) >= 0.5 else 0