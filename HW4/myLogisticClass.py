import numpy
import math
import numpy as np

class myLogistic:
    def __init__(self, lr, epoch_n, batch_n, feature_len):
        self.lr = lr
        self.epoch_n = epoch_n    
        self.batch_n = batch_n    
        self.w = np.zeros((feature_len,)) + 1
        self.b = 1
        self.feature_len = feature_len

    def train(self, dataset):
        np.random.seed(123)
        features = dataset[:,:self.feature_len]
        labels = dataset[:, self.feature_len]
        for i in range(self.epoch_n):
            indices = np.random.randint(len(features), size=(self.batch_n,))
            print('rand', indices)
            features_e = features[indices]
            labels_e = labels[indices]
            dw = self.train_one_epoch(features_e, labels_e)
            self.w = self.w - sum(dw) / self.batch_n

    def train_one_epoch(self, feature, label):
        y_ = self.train_predict(feature)
        err = label - y_
        dw = self.lr * err[:,None] * feature
        return np.sum(dw, axis=1)

    def train_predict(self, feature):
        x = np.dot(feature, self.w) + self.b
        return 1 / (1 + np.e**(x)) 
    
    def predict(self, feature):
        return 1 if self.train_predict(feature) >= 0.5 else 0 