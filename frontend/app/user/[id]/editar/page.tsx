import UserEditForm from "@/features/user/components/user-edit-form";

export default async function EditarUsuarioPage({ params }: any) {
    const { id } = await params;
    return <UserEditForm userId={id}/>;
}