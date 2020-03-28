const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2a) TOURS ROUTE HANDLERS

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  if (id > tours.length || id < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour: tour
    }
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      err
        ? console.log(err)
        : res.status(201).json({
            status: 'success',
            data: {
              tour: newTour
            }
          });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length || req.params.id * 1 < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<UPDATED TOUR HERE...>'
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length || req.params.id * 1 < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

// 2b) USERS ROUTE HANDLERS

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
// );

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

// 3) ROUTES
const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .patch(updateTour)
  .get(getTour)
  .delete(deleteTour);

const userRouter = express.Router();
app.use('/api/v1/users', userRouter);

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4) START SERVER

const port = 3000;
app.listen(port, () => {
  console.log('Running on port ' + port);
});
