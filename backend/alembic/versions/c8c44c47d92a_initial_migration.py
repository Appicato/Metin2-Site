"""Initial migration

Revision ID: c8c44c47d92a
Revises: 
Create Date: 2025-07-11 20:51:23.462817

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c8c44c47d92a'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('item_prices', sa.Column('server', sa.String(), nullable=False, server_default=''))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('item_prices', 'server')
    # ### end Alembic commands ###
