import * as express from 'express';
import { EmployeeController } from '../controllers/Employee.controller';
import { checkToken } from './helpers/CheckToken.helper';

const router = express.Router();
const employee = new EmployeeController();

router.get('/employee/employees/:city', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    employee.getEmployees(req, res, next);
  });
});

router.post('/employee/employee-create', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    employee.create(req, res, next);
  });
});

/* router.put('/order/orders/:id', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    order.updateOrder(req, res, next)
  })
}); */

export default router;