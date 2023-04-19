"""empty message

Revision ID: 931c36522d02
Revises: e92246b53b8a
Create Date: 2023-04-18 19:17:39.896313

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '931c36522d02'
down_revision = 'e92246b53b8a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.add_column(sa.Column('avatar', sa.String(length=250), nullable=False))

    with op.batch_alter_table('lawyer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('avatar', sa.String(length=250), nullable=False))
        batch_op.create_unique_constraint(None, ['col_number'])

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('avatar', sa.String(length=250), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('avatar')

    with op.batch_alter_table('lawyer', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('avatar')

    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.drop_column('avatar')

    # ### end Alembic commands ###
