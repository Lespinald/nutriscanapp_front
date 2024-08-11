
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export default function ComponenteAlert(input: string, seconds: number,type: AlertType) {
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
      icon: type,
      title: input
    });
};