import re

EMP_PREFIX = "EMP"
EMP_PADDING = 3

def generate_next_emp_id(last_emp_id: str | None) -> str:
    if not last_emp_id:
        return f"{EMP_PREFIX}{str(1).zfill(EMP_PADDING)}"

    match = re.search(rf"{EMP_PREFIX}(\d+)", last_emp_id)

    if not match:
        return f"{EMP_PREFIX}{str(1).zfill(EMP_PADDING)}"

    next_number = int(match.group(1)) + 1
    return f"{EMP_PREFIX}{str(next_number).zfill(EMP_PADDING)}"
