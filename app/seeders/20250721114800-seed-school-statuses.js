const fs = require('fs')
const path = require('path')

// const createRevision = require('./helpers/createRevision')
// const createActivityLog = require('./helpers/createActivityLog')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('school_statuses', null, { transaction })
      // await queryInterface.bulkDelete('school_status_revisions', null, { transaction })
      // await queryInterface.bulkDelete('activity_logs', {
      //   entity_type: 'school_status'
      // }, { transaction })

      const createdAt = new Date()
      const systemUserId = '354751f2-c5f7-483c-b9e4-b6103f50f970' // Acting user ID for changes
      // const revisionNumber = 1

      const items = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/seed-school-statuses.json'), 'utf8'))

      for (const item of items) {
        const baseFields = {
          id: item.id,
          code: item.code,
          name: item.name,
          rank: item.rank,
          created_by_id: systemUserId,
          created_at: createdAt,
          updated_by_id: systemUserId,
          updated_at: createdAt
        }

        // 1. Insert into users table
        await queryInterface.bulkInsert('school_statuses', [baseFields], { transaction })

        // 2. Create revision
        // const { id: _, ...revisionDataWithoutId } = baseFields

        // const revisionId = await createRevision({
        //   revisionTable: 'school_status_revisions',
        //   entityId: item.id,
        //   revisionData: revisionDataWithoutId,
        //   revisionNumber,
        //   userId: systemUserId,
        //   timestamp: createdAt
        // }, queryInterface, transaction)

        // 3. Create activity log
        // await createActivityLog({
        //   revisionTable: 'school_status_revisions',
        //   revisionId,
        //   entityType: 'school_status',
        //   entityId: item.id,
        //   revisionNumber,
        //   changedById: systemUserId,
        //   changedAt: createdAt
        // }, queryInterface, transaction)
      }

      await transaction.commit()
    } catch (error) {
      // console.error('School status seeding error with revisions and activity logs:', error)
      console.error('School status seeding error:', error)
      await transaction.rollback()
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('activity_logs', {
    //   entity_type: 'school_status'
    // })
    // await queryInterface.bulkDelete('school_status_revisions', null, {})
    await queryInterface.bulkDelete('school_statuses', null, {})
  }
}
