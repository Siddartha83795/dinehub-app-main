import { outlets } from '@/lib/data';
import MenuClientPage from './menu-client-page';

export async function generateStaticParams() {
  return outlets.map((outlet) => ({
    outletId: outlet.id,
  }));
}

export default function MenuPage({ params }: { params: Promise<{ outletId: string }> }) {
  return <MenuClientPage params={params} />;
}
