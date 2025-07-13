"""Add users and user_server many-to-many table

Revision ID: 41d2d5df167d
Revises: b78a22ba6fce
Create Date: 2025-07-12 19:06:00.639928

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '41d2d5df167d'
down_revision: Union[str, Sequence[str], None] = 'b78a22ba6fce'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Tabelle users anlegen
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('username', sa.String(50), nullable=False, unique=True, index=True),
        sa.Column('email', sa.String(100), nullable=False, unique=True, index=True),
        sa.Column('hashed_password', sa.String(255), nullable=False)
    )

    # Join-Tabelle user_server anlegen
    op.create_table(
        'user_server',
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), primary_key=True),
        sa.Column('server_id', sa.Integer, sa.ForeignKey('servers.id'), primary_key=True)
    )


def downgrade():
    op.drop_table('user_server')
    op.drop_table('users')
