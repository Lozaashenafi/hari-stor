import { getAllAdmins } from "@/services/user.service"
import UserListClient from "./UserListClient"
import AddUserForm from "./AddUserForm"

export default async function UsersPage() {
  const users = await getAllAdmins();

  return (
    <div className="space-y-12 pb-20 px-4">
      <header>
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">Personnel</h1>
        <p className="text-[#5a3e00] text-xs uppercase tracking-[0.4em] mt-4 font-black">
          Access Control & Team Management
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Add New Admin Form */}
        <div className="lg:col-span-4">
          <AddUserForm />
        </div>

        {/* Right: Current Admins List */}
        <div className="lg:col-span-8">
          <UserListClient users={users} />
        </div>
      </div>
    </div>
  )
}