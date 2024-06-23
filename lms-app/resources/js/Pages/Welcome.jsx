import { Link, Head, useForm } from "@inertiajs/react";
import { Button, Label, TextInput } from "flowbite-react";

export default function Welcome({ auth }) {
    const { data, setData, errors, post } = useForm({
        phone_or_email: "",
    });

    const submit = (e) => {
        e.preventDefault()
        post(route('postJoinCourse'))
    }

    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-between items-center w-screen h-screen bg-slate-200">
                <form onSubmit={submit} className="mx-auto my-0 flex justify-center items-center flex-col">
                    <Label className="uppercase text-[25px] font-bold text-slate-700 my-[20px]">
                        Enter your email or your phone
                    </Label>
                    <TextInput
                        className="w-[500px]"
                        defaultValue={data?.phone_or_email}
                        onChange={(e) =>
                            setData("phone_or_email", e.target.value)
                        }
                        color={errors?.phone_or_email && "failure"}
                        helperText={
                            errors?.phone_or_email
                        }
                        required
                    />
                    <Button color="warning" type="submit" className="my-[20px]">JOIN COURSE</Button>
                </form>
            </div>
        </>
    );
}
