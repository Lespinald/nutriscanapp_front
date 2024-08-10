
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function ComponenteAlert(input: string, seconds: number,positive:boolean) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: seconds * 1000,
        timerProgressBar: true,
        backdrop:true,
        allowOutsideClick:true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: positive ? "success" : "error",
        title: input
      });
};