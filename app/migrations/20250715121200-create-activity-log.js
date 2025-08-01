module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      revision_table: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'The name of the table where the revision occurred (e.g. user_revisions)'
      },
      revision_id: {
        type: Sequelize.UUID,
        allowNull: false,
        comment: 'The ID of the revision record (e.g. in user_revisions)'
      },
      entity_type: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'High-level type of entity (e.g. school, provider, user)'
      },
      entity_id: {
        type: Sequelize.UUID,
        allowNull: false,
        comment: 'The ID of the entity affected by the revision (e.g. user.id)'
      },
      revision_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'update'
      },
      changed_by_id: {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'The user who made the change'
      },
      changed_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('activity_logs')
  }
}
