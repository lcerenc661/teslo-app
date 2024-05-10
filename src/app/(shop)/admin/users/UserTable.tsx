"use client";

import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

import React from "react";
import { User } from "@/interfaces";
import { ChangeUserRole } from "@/actions";

interface Props {
  users: User[];
}

const UserTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Rol
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              key={user.id}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>

              <td className="text-sm text-gray-900 font-light px-6 ">
                <select
                  className="text-sm text-gray-900"
                  value={user.role}
                  onChange={(e) =>
                    ChangeUserRole(user.id, e.target.value as any)
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
