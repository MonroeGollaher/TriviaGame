import { logger } from '../utils/Logger'
import Swal from 'sweetalert2'
class NotificaionService {
  async deleteNotification() {
    try {
      const res = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to undo this",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete game'
      })

      if (res.value) {
        Swal.fire(
          'Deleted!',
          'Your game has been deleted.',
          'success'
        )
        return true
      }
      return false
    } catch (error) {
      logger.error(error)
      return false
    }
  }
}
// try {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     }
//     console.log(result)
//     return result.isConfirmed
//   }).catch(() => {
//     return false
//   })
// } catch (error) {
//   logger.error(error)
//   return false
// }

export const notificationService = new NotificaionService()
