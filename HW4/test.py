import numpy as np
from myLogisticClass import myLogistic

# parsedData: 
# input : np.array( [label, f1,f2,f3,f4], ...)

# test
def mapper(line):
    """
    Mapper that converts an input line to a feature vector
    """    
    feats = line.strip().split(",") 
    # labels must be at the beginning for LRSGD
    label = feats[len(feats) - 1] 
    feats = feats[: len(feats) - 1]
    feats.insert(0,label)
    features = [ float(feature) for feature in feats ] # need floats
    return np.array(features)

# Load and parse the data
data = []
with open('./data.txt', 'r') as f:
    data = f.readlines()

parsedData = map(mapper, data)
parsedData = np.array(parsedData)

# Train model
model = myLogistic(0.1, 40, 10, 4)
model.train(parsedData)
print(model.w, model.b)

# Predict the first elem will be actual data and the second 
# item will be the prediction of the model
labelsAndPreds = map(lambda point: (int(point.item(0)), 
        model.predict(point.take(range(1, point.size)))), parsedData)

# Evaluating the model on training data
trainErr = len(filter(lambda (v, p): (v != p), labelsAndPreds)) / float(len(labelsAndPreds))

# Print some stuff
print("Training Error = " + str(trainErr))