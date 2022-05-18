import { Users } from '../db-models/users-model';

const isAdmin = (req: any, resp: any) => {
  console.log('REQUEST', req.body);
  const { email, password, role } = req.body;

  Users.findOne({ email: { $eq: `${email}` }, password: { $eq: `${password}` }, role: { $eq: 'admin' } }).then((result) => {
    if (null != result) {
      const { email, password, role, _id } = result;
      const response = {
        email,
        password,
        role,
        id: _id.toString()
      };

      resp.status(200).json({ isExisting: true, userData: response })
    } else {
      resp.status(404).json({ isExisting: false, userData: result })
    }
  }).catch((err) => {
    resp.status(500).json({ err })
  });
};

const isUser = (req: any, resp: any) => {
  const { email, password, role } = req.body;
  Users.findOne({ email: { $eq: `${email}` }, password: { $eq: `${password}` }, role: { $eq: 'user' } }).then((result) => {

    if (null != result) {
      const { email, password, role, _id } = result;
      const response = {
        email,
        password,
        role,
        id: _id.toString()
      };

      resp.status(200).json({ isExisting: true, userData: response })
    } else {
      resp.status(404).json({ isExisting: false, userData: result })
    }
  }).catch((err) => {
    resp.status(500).json({ err })
  });
};

export { isAdmin, isUser };