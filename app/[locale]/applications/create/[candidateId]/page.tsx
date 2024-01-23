'use client'
import {Link} from "next-intl";
import {Eye} from "@/icons/eye";

const CreateApplication = ({params}: {
    params: {
        candidateId: number
    }
}) => {

    return (
        <div>
            <h1 style={{color:"white"}}>{params.candidateId}</h1>
            <Link href="/">
                <Eye/>
            </Link>
        </div>
    );
}

export default CreateApplication;