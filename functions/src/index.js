import {functions} from "./lib/firebase"
// Imports from lib 📘
import * as reservations from "./lib/reservations"
import * as messages from "./lib/messages"
import * as prices from "./lib/prices"
import * as pictures from "./lib/pictures"
import * as feedbacks from "./lib/feedbacks"



// Reservation handling 🔖
export const {reservationCreated, reservationChanged, reservationDeleted} = reservations

export const reservationExists = functions.https
  .onRequest(reservations.exists)

export const getOverlaps = functions.https
  .onRequest(reservations.overlaps)



// Message handling 📯
export const messageCreated = functions.firestore
  .document("messages/{messageId}").onCreate(messages.messageCreated)



// Room handling 🏘
export const populatePrices = functions.database
  .ref("rooms/{roomId}/prices/metadata/maxPeople")
  .onUpdate(prices.populate)

export const calculateMinPrices = functions.database
  .ref("rooms/{roomId}/prices/table/")
  .onUpdate(prices.calculateMinPrices)



// Picture handling 🍱
export const generateThumbnail = functions.storage.object()
  .onFinalize(pictures.generateThumbnail)

export const deletePictures = functions.database
  .ref("galleries/{galleryId}/{pictureId}")
  .onDelete(pictures.deletePictures)

export const deleteRoomPictures = functions.database
  .ref("galleries/szobak/{roomId}/{pictureId}")
  .onDelete(pictures.deletePictures)



// Feedbacks handling ⭐⭐⭐⭐⭐
// Cron job to check if feedback e-mails should be sent out. ⏰
export const feedbackCron = functions.https
  .onRequest(feedbacks.cron)

export const {feedbackChanged} = feedbacks


