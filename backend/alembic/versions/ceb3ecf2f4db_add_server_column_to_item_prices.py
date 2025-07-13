"""Add server column to item_prices

Revision ID: ceb3ecf2f4db
Revises: c8c44c47d92a
Create Date: 2025-07-11 21:24:06.596721
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'ceb3ecf2f4db'
down_revision = 'c8c44c47d92a'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Diese Migration ist leer, weil server_id bereits existiert.
    pass

def downgrade() -> None:
    # Diese Migration ist leer, weil server_id bereits existiert.
    pass
