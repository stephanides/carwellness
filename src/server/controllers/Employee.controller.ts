import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcryptjs'
import config from '../config'
import * as nodemailer from 'nodemailer'
import * as jwt from 'jsonwebtoken'
import { IEmployee } from '../interfaces/Employee.interface';

import { Employee, EmployeeDocument, Employees } from '../models/Employee.model'

export class EmployeeController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const employeeExist = await Employees.findOne({name: req.body.name});

      if (employeeExist) {
        throw this.throwError('Employee allready exist', 409, next);
      } else {
        let employeeData: object = {} as IEmployee;

        for(let i: number = 0; i < Object.keys(req.body).length; i++) {
          employeeData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i];
        }

        const newEmployee = new Employee(employeeData as IEmployee);
        
        await Employees.create(newEmployee);

        res.json({ data: 'Employee has been created', success: true });
      }
    } catch (err) {
      return next(err);
    }
  }

  async getEmployees(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query: object = parseInt(req.params.city) > 0 ? { city: parseInt(req.params.city)} : {}; // { $and: [{ city: parseInt(req.params.city) }, { deleted: false }] } : { };
      const employees: Array<Object> = await Employees.find(query);

      if(!employees || employees.length < 1) {
        this.throwError('Nothing found', 404, next);
      } else {
        res.json({ data: employees, success: true });
      }
    } catch (err) {
      return next(err);
    }
  }

  async removeEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const employeeToRemove = Employees.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });

      if (!employeeToRemove) {
        this.throwError('Employee not found', 404, next);
      } else {
        await Employees.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });

        res.json({ data: "Employee has been removed" });
      }
    } catch (err) {
      return next(err);
    }
  }

  throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: Error = new Error(errMessage);

    err['status'] = errStatus
    return next(err)
  }
}
