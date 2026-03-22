import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import { EmployeeResignationModel } from '../../../Models/employee/employeeM'
import resignationService from '../../../Services/resignation-service'
import "../../HR/Resignation/resignation.css"

const AddResignation = ({ resignationRef, setOpenDialog }) => {

    const quillRefs = useRef([])
    const queryClient = useQueryClient();

    /**
     * Quill editor modules configuration
     */
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image',],
        ],
    }

    /**
     * Quill editor formats configuration
     */
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ]

    const { mutate: updateAboutUsMutation, isPending: isLoading } = useMutation({
        mutationFn: (values: EmployeeResignationModel) => resignationRef?.id ? resignationService.updateResignation(values, resignationRef?.id) : resignationService.createResignation(values),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getResignationQueryKey'] });
                setOpenDialog(false);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    })

    /**
     * Sends the HTML content of the Quill editors to the backend
     */
    const sendHTMLToBackend = () => {

        const description = quillRefs.current[0].getEditor().root.innerHTML

        if (quillRefs.current[0].getEditor().getText().trim().length < 50) {
            toast.warning("Your input is too short. Please provide at least 50 characters.");
            return;
        }

        const data = {
            description: description
        }
        updateAboutUsMutation(data)
    }

    return (
        <div className='modal-form'>
            <div className='relative mb-2'>
                <ReactQuill
                    theme="snow"
                    value={resignationRef?.description || ''}
                    modules={modules}
                    formats={formats}
                    className="text-editor"
                    ref={(el) => { quillRefs.current[0] = el }}
                    readOnly={resignationRef?.isDisabled}
                />
            </div>
            {
                !resignationRef?.isDisabled && (
                    <div className="mt-1">
                        <Button type="submit" className="btn btn-primary" onClick={sendHTMLToBackend}>
                            <span>
                                Submit
                            </span>
                        </Button>
                    </div>
                )
            }

        </div>

    )
}

export default AddResignation