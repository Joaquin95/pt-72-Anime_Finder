"""empty message

Revision ID: 7af0cb66fdcf
Revises: 9fbf79fd14a9
Create Date: 2024-12-18 03:34:59.226806

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7af0cb66fdcf'
down_revision = '9fbf79fd14a9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite_anime', schema=None) as batch_op:
        batch_op.add_column(sa.Column('manga_id', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite_anime', schema=None) as batch_op:
        batch_op.drop_column('manga_id')

    # ### end Alembic commands ###