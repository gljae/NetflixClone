"""멤버십 플랜 정의.

플랜은 4개로 고정이고 관리자 화면도 없어서 테이블 대신 상수로 둔다.
나중에 플랜을 DB 로 옮기더라도 이 딕셔너리와 같은 모양만 유지하면
템플릿은 손댈 필요가 없다.
"""

PLANS = {
    "free": {
        "name": "무료",
        "price": 0,
        "quality": "720p (HD)",
        "resolution": "1280 x 720",
        "devices": "1대",
        "paid": False,
        "note": "광고가 포함되며 일부 콘텐츠는 시청할 수 없습니다.",
    },
    "basic": {
        "name": "광고형 스탠다드",
        "price": 5500,
        "quality": "1080p (FHD)",
        "resolution": "1920 x 1080",
        "devices": "2대",
        "paid": True,
        "note": "광고가 포함됩니다.",
    },
    "standard": {
        "name": "스탠다드",
        "price": 13500,
        "quality": "1080p (FHD)",
        "resolution": "1920 x 1080",
        "devices": "2대",
        "paid": True,
        "note": "광고가 없습니다.",
    },
    "premium": {
        "name": "프리미엄",
        "price": 17000,
        "quality": "4K (UHD) + HDR",
        "resolution": "3840 x 2160",
        "devices": "4대",
        "paid": True,
        "note": "광고가 없으며 공간 음향을 지원합니다.",
    },
}

#: 플랜 선택 화면에 노출할 순서. 딕셔너리 순서에 의존하지 않으려고 따로 둔다.
PLAN_ORDER = ["free", "basic", "standard", "premium"]


def ordered_plans():
    """(code, plan) 튜플을 노출 순서대로 돌려준다."""
    return [(code, PLANS[code]) for code in PLAN_ORDER]
