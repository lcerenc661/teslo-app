// https://tailwindcomponents.com/component/hoverable-table

import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import UserTable from "./UserTable";
import { getPaginatedUsers } from "@/actions/products/get-paginated-users";

export default async function Users() {
  const { users = [], ok } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }
  return (
    <>
      <Title title="Manage Users" />

      <div className="mb-10">
        <UserTable users={users as any} />

      </div>
    </>
  );
}

function getOrdersByUser() {
  throw new Error("Function not implemented.");
}
