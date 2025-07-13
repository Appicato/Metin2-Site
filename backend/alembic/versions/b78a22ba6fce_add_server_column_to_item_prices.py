"""Add server column to item_prices

Revision ID: b78a22ba6fce
Revises: ceb3ecf2f4db
Create Date: 2025-07-11 21:26:18.607090

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b78a22ba6fce'
down_revision: Union[str, Sequence[str], None] = 'ceb3ecf2f4db'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
