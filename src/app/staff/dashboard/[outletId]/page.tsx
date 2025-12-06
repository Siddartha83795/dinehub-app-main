import { outlets } from '@/lib/data';
import StaffDashboardClientPage from './dashboard-client-page';

export async function generateStaticParams() {
    return outlets.map((outlet) => ({
        outletId: outlet.id,
    }));
}

export default function StaffDashboardPage({ params }: { params: Promise<{ outletId: string }> }) {
    return <StaffDashboardClientPage params={params} />;
}
