import { auth } from '@/auth.config';
import CheckOut from './(checkout)/page';
import { redirect } from 'next/navigation';

export default async function CheckOutLayout({
 children
}: {
 children: React.ReactNode;
}) {
    const session = await auth();
    if (!session?.user){

        redirect("/auth/login?redirect=/checkout/address")

    }
  return (
    <div>
      { children }
    </div>
  );
}