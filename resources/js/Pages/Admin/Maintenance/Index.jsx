import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, Button } from "flowbite-react";
import MDEditor from "@uiw/react-md-editor";
import { Switch } from "@headlessui/react";
import { toByteArray } from "base64-js";

export default function MaintenanceIndex(props) {
    let title = "Maintenance";

    let content = toByteArray(props.message)
    content = new TextDecoder().decode(content)

    const { data, setData, post, processing, errors } = useForm({
        message: content,
        enabled: props.enabled == 1,
        _token: props.csrf_token,
    });

    async function submit(e) {
        e.preventDefault();
        post(route("admin.maintenance.submit"), {
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => {},
            onSuccess: (data) => {},
            onError: (data) => {},
        });
    }

    return (
        <AdminLayout>
            <Head title={title} />
            <form onSubmit={submit} className="p-10">
                <h1 className="text-3xl text-white mb-5">{title}</h1>
                <Card>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Message affiché à l'accueil
                    </h5>
                    <MDEditor
                        value={data.message}
                        height={500}
                        disabled={processing}
                        preview="edit"
                        onChange={(e) => {
                            setData("message", e);
                        }}
                    />

                    <div className="flex items-center gap-6 h-full">
                        <Switch
                            checked={data.enabled}
                            disabled={processing}
                            onChange={(e) => {
                                setData("enabled", e);
                            }}
                            className={`${
                                data.enabled ? "" : "bg-[var(--fzbg-3)]"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${
                                    data.enabled
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                        <span className="text-xl text-white">
                            Souhaitez-vous activer la maintenance ?
                        </span>
                    </div>
                    <Button
                        className="w-fit"
                        type="submit"
                        disabled={processing}
                    >
                        Sauvegarder
                    </Button>
                </Card>
            </form>
        </AdminLayout>
    );
}
