import { check } from 'meteor/check'
import Tasks from '../tasks.js'

Meteor.publish('mytasks', function mytasks(filter) {
  check(filter, String)
  if (!this.userId) {
    return this.ready()
  }
  if (filter) {
    check(filter, String)
    return Tasks.find({ userId: this.userId, name: { $regex: `.*${filter.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&')}.*`, $options: 'i' } }, { limit: 10, sort: { lastUsed: -1 } })
  }
  return Tasks.find({ userId: this.userId }, { limit: 10, sort: { lastUsed: -1 } })
})
